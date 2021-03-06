Raft: Understandable Distributed Consensus 
===========================================

Raft图解，在线观看:

[https://www.hesimin.cn/raft/](https://www.hesimin.cn/raft/)




# 分布式系统的Raft算法

相比Paxos难于理解，更难以实现，来自Stanford的新的分布式协议研究称为Raft，它是一个为真实世界应用建立的协议，主要注重协议的落地性和可理解性。

在了解Raft之前，我们先了解Consensus一致性这个概念，它是指多个服务器在状态达成一致，但是在一个分布式系统中，因为各种意外可能，有的服务器可能会崩溃或变得不可靠，它就不能和其他服务器达成一致状态。这样就需要一种Consensus协议，一致性协议是为了确保容错性，也就是即使系统中有一两个服务器当机，也不会影响其处理过程。

为了以容错方式达成一致，我们不可能要求所有服务器100%都达成一致状态，只要超过半数的大多数服务器达成一致就可以了，假设有N台服务器，N/2 +1 就超过半数，代表大多数了。

Paxos和Raft都是为了实现Consensus一致性这个目标，这个过程如同选举一样，参选者需要说服大多数选民(服务器)投票给他，一旦选定后就跟随其操作。Paxos和Raft的区别在于选举的具体过程不同。

在Raft中，任何时候一个服务器可以扮演下面角色之一：

- Leader: 处理所有客户端交互，日志复制等，一般一次只有一个Leader.
- Follower: 类似选民，完全被动
- Candidate候选人: 类似Proposer律师，可以被选为一个新的领导人。

Raft阶段分为两个，首先是选举过程，然后在选举出来的领导人带领进行正常操作，比如日志复制等。

ref：http://www.jdon.com/artichect/raft.html

From: https://github.com/benbjohnson/thesecretlivesofdata