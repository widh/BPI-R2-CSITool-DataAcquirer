/*
 * (c) 2008-2011 Daniel Halperin <dhalperi@cs.washington.edu>
 * and.. Modified by Jio Gim
 */
#include "iwl_connector.h"
#include "bfee.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <linux/netlink.h>

#define MAX_PAYLOAD 2048
#define SLOW_MSG_CNT 1

int sock_fd = -1; // the socket

void caught_signal(int sig);

void exit_program(int code);
void exit_program_err(int code, char *func);

int main(int argc, char **argv)
{
  /* Local variables */
  struct sockaddr_nl proc_addr, kern_addr; // addrs for recv, send, bind
  struct cn_msg *cmsg;
  char buf[4096];
  int ret;
  unsigned short l;
  unsigned int count = 0;
  float firstTimestamp = 0;

  /* Setup the socket */
  sock_fd = socket(PF_NETLINK, SOCK_DGRAM, NETLINK_CONNECTOR);
  if (sock_fd == -1)
    exit_program_err(-1, "socket");

  /* Initialize the address structs */
  memset(&proc_addr, 0, sizeof(struct sockaddr_nl));
  proc_addr.nl_family = AF_NETLINK;
  proc_addr.nl_pid = getpid(); // this process' PID
  proc_addr.nl_groups = CN_IDX_IWLAGN;
  memset(&kern_addr, 0, sizeof(struct sockaddr_nl));
  kern_addr.nl_family = AF_NETLINK;
  kern_addr.nl_pid = 0; // kernel
  kern_addr.nl_groups = CN_IDX_IWLAGN;

  /* Now bind the socket */
  if (bind(sock_fd, (struct sockaddr *)&proc_addr, sizeof(struct sockaddr_nl)) == -1)
    exit_program_err(-1, "bind");

  /* And subscribe to netlink group */
  {
    int on = proc_addr.nl_groups;
    ret = setsockopt(sock_fd, 270, NETLINK_ADD_MEMBERSHIP, &on, sizeof(on));
    if (ret)
      exit_program_err(-1, "setsockopt");
  }

  /* Set up the "caught_signal" function as this program's sig handler */
  signal(SIGINT, caught_signal);

  /* Poll socket forever waiting for a message */
  setbuf(stdout, NULL);
  printf("Started to get packets!\n");
  while (1)
  {
    /* Receive from socket with infinite timeout */
    ret = recv(sock_fd, buf, sizeof(buf), 0);
    if (ret == -1)
      exit_program_err(-1, "recv");
    /* Pull out the message portion and print some stats */
    cmsg = NLMSG_DATA(buf);
    l = (unsigned short)cmsg->len;
    if (l > ret)
    {
      printf("\nError on writing! %d > %d\n", l, ret);
    }
    else if (count % 1000 == 0)
    {
      int kCount = count / 1000;
      struct iwl_bfee_notif *bfee = (void *)&cmsg->data[1];
      float pps = 0;
      float ts = ((float)bfee->timestamp_low) * 1.0e-6;
      if (count == 0)
      {
        firstTimestamp = ts;
        printf("First timestamp is %.3f\n", firstTimestamp);
      }
      else
      {
        pps = (float)count / (ts - firstTimestamp);
      }
      printf("Tx=%d  Rx=%d  AvgPPS=%.3f  |  Wrote %d kb in total [msgcnt=%uk]\n", bfee->Ntx, bfee->Nrx, pps, ret * kCount, kCount);
    }
    count++;
  }

  exit_program(0);
  return 0;
}

void caught_signal(int sig)
{
  fprintf(stderr, "Caught signal %d\n", sig);
  exit_program(0);
}

void exit_program(int code)
{
  if (sock_fd != -1)
  {
    close(sock_fd);
    sock_fd = -1;
  }
  exit(code);
}

void exit_program_err(int code, char *func)
{
  perror(func);
  exit_program(code);
}
