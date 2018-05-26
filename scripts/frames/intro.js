"use strict";
/*jslint browser: true, nomen: true*/
/*global define*/

define([], function () {
    return function (frame) {
        var player = frame.player(),
            layout = frame.layout(),
            model = function () {
                return frame.model();
            },
            client = function (id) {
                return frame.model().clients.find(id);
            },
            node = function (id) {
                return frame.model().nodes.find(id);
            },
            wait = function () {
                var self = this;
                model().controls.show(function () {
                    self.stop();
                });
            };

        frame.after(1, function () {
            model().nodeLabelVisible = false;
            frame.snapshot();
            frame.model().clear();
            layout.invalidate();
        })

            .after(1000, function () {
                frame.model().title =
                    '<h5 style="visibility:visible">So What is Distributed Consensus?</h5>'
                    + '<h5 style="visibility:visible">在介绍算法之前，先了解一下什么是"分布式一致性"问题</h5>'
                    + '<h6 style="visibility:hidden;">Let\'s start with an example...</h6>'
                    + '<h6 style="visibility:hidden;">我们通过一个例子来说明...</h6>'
                    + '<br/>' + frame.model().controls.html();
                layout.invalidate();
            })
            .after(1000, function () {
                layout.fadeIn($(".title h6"));
            })
            .after(1000, function () {
                frame.model().controls.show();
            })
            .after(50, function () {
                frame.model().title = frame.model().subtitle = "";
                layout.invalidate();
            })


            .after(800, function () {
                frame.snapshot();
                frame.model().subtitle =
                    '<p>Let\'s say we have a single node system</p>'
                    + '<p>假如现在有一个单节点的系统</p>'
                    + frame.model().controls.html();
                layout.invalidate();
            })
            .after(500, function () {
                frame.model().nodes.create("a");
                layout.invalidate();
            })
            .after(100, wait).indefinite()

            .after(100, function () {
                frame.snapshot();
                frame.model().subtitle = "";
                frame.model().zoom([node("a")]);
                layout.invalidate();
            })
            .after(600, function () {
                frame.model().subtitle =
                    '<p>For this example, you can think of our <span style="color:#4582ec">node</span> as a database server that stores a single value.</p>'
                    + '<p>具体的，可以假设这个 <span style="color:#4582ec">节点</span> 是一个数据库，并且存储了一个数值（x）</p>'
                    + frame.model().controls.html();
                layout.invalidate();
            })
            .after(100, wait).indefinite()
            .after(100, function () {
                frame.snapshot();
                node("a")._value = "x";
                layout.invalidate();
            })
            .after(100, wait).indefinite()

            .after(100, function () {
                frame.snapshot();
                frame.model().subtitle = "";
                frame.model().zoom(null);
                layout.invalidate();
            })
            .after(1000, function () {
                frame.model().subtitle =
                    '<p>We also have a <span style="color:#02b875">client</span> that can send a value to the server.</p>'
                    + '<p>然后，我们还有一个<span style="color:#02b875">客户端</span>，它可以操作数据库修改数值</p>'
                    + frame.model().controls.html();
                layout.invalidate();
            })
            .after(500, function () {
                frame.model().clients.create("X");
                layout.invalidate();
            })
            .after(100, wait).indefinite()


            .after(100, function () {
                frame.snapshot();
                frame.model().subtitle += "";
                client("X").value("8");
                layout.invalidate();
            })
            .after(200, function () {
                frame.model().send(client("X"), node("a"), null, function () {
                    node("a")._value = "8";
                    layout.invalidate();
                });
                layout.invalidate();
            })
            .after(100, wait).indefinite()
            .after(100, function () {
                frame.model().subtitle =
                    '<p>Coming to agreement, or <span style="color:#f0ad4e">consensus</span>, on that value is easy with one node.</p>'
                    + '<p>在这种只有一个节点的情况下，数值达成<span style="color:#f0ad4e">一致</span>是比较容易实现的</p>'
                    + frame.model().controls.html();
                layout.invalidate();
            })
            .after(100, wait).indefinite()


            .after(100, function () {
                frame.snapshot();
                frame.model().subtitle =
                    '<p>But how do we come to consensus if we have multiple nodes?</p>'
                    +'<p>但是，在有多个节点的情况下，如何实现一致呢?</p>'
                    + frame.model().controls.html();
                layout.invalidate();
            })
            .after(500, function () {
                frame.model().nodes.create("b");
                layout.invalidate();
            })
            .after(500, function () {
                frame.model().nodes.create("c");
                layout.invalidate();
            })
            .after(100, wait).indefinite()


            .after(100, function () {
                frame.snapshot();
                frame.model().subtitle =
                    '<p>That\'s the problem of <span style="color:#f0ad4e">distributed consensus</span>.</p>'
                    +'<p>这个问题就是所谓的 <span style="color:#f0ad4e">分布式一致性问题</span></p>'
                    + frame.model().controls.html();
                layout.invalidate();
            })
            .after(100, wait).indefinite()

            .after(300, function () {
                frame.snapshot();
                player.next();
            })


        frame.addEventListener("end", function () {
            frame.model().title = frame.model().subtitle = "";
            layout.invalidate();
        });

        player.play();
    };
});

