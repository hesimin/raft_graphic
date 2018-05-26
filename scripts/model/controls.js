
"use strict";
/*jslint browser: true, nomen: true*/
/*global define, playback*/

define([], function () {
    function Controls(model) {
        var self = this;
        this.model = model;
        this.callback = null;

        this.show = function(callback) {
            this.callback = (callback !== undefined ? callback : null);
            if (this.callback === null) {
                self.model.player().pause();
            }
            self.rollback.show();
            self.resume.show();
        };

        this.html = function(c) {
            return '<div class="btn-group'+(c?' '+c:'')+'" style="margin-top: 20px">'
                + (model.player().current().rollbackable(2) ? self.rollback.html() : "") + self.resume.html()
                + '</div>';
        };

        this.rollback = {
            show: function() {
                $(".btn.rollback").css('visibility','visible').hide().fadeIn(600);
            },
            html: function() {
                return '<button type="button" style="visibility:hidden" class="btn btn-outline-success rollback" alt="Replay previous frame"><span class="fa fa-angle-double-left"></span></button>';
            },
            click: function() {
                model.player().current().rollback(2);
                model.player().layout().invalidate();
                model.player().play();
            },
        };

        this.resume = {
            show: function() {
                $(".btn.resume").css('visibility','visible').hide().fadeIn(600);
            },
            html: function() {
                return '<button type="button" style="visibility:hidden;padding-left: 25px;padding-right: 15px" class="btn btn-outline-success resume" alt="Continue to next frame">下一步  <span class="fa fa-angle-double-right" style="margin-left: 5px"></span></button>';
            },
            click: function() {
                if (self.callback !== null) {
                    self.callback();
                    self.callback = null;
                } else {
                    model.player().play();
                }
            },
        };
    }

    return Controls;
});
