/**
 * Treasy 0.1
 *
 * Details at
 * https://github.com/tgolsen/treasy
 *
 * [from "Simplified BSD License"]
 *
 * Copyright (c) 2013, Ted Olsen
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those
 * of the authors and should not be interpreted as representing official policies,
 * either expressed or implied, of the organization.
 */

// Basic Tree jQuery extension
(function( $ ) {
    var right_arrow = "&nbsp;&#9656;&nbsp;";
    var down_arrow = "&nbsp;&#9662;&nbsp;";

    var methods = {
        init : function(data) {
            var forest = this;
            var $this = this, $this_tree = this;

            this.addClass('tree-holder')
            this.data('disabled', 0);

            // Init root level trees
            $.each(data, function(idx){
                forest.append($this.treasy('get_tree', data[idx]));
            });

            assign_toggle_events($this_tree, $this_tree.find(".toggle"));
        },
        get_selected_ids : function() {
            var ids = [];
            $.each(this.find(':checked').parent(), function() { ids.push($(this).data('id')) });
            return ids;
        },
        get_selected_values : function() {
            var ids = [];
            $.each(this.find(':checked').parent(), function() {
                var node_path = "";
                node_path += $(this).data('value');
                $.each($(this).parents('.tree-node'), function() {
                    node_path = $(this).data('value') +  " - " + node_path;
                });
                ids.push(node_path);
            });
            return ids;
        },
        list_selected : function(join) {
            var ids = this.treasy('get_selected_values');
            if(typeof join != 'undefined') {
                ids = ids.join(join);
            }
            return ids;
        },
        collapse_node : function($nodes) {
            if(this.data('disabled') == 1)
                return;

            $nodes.find('>.toggle').html(right_arrow).data('expanded', 0); // >>
            $nodes.find('>.tree-node').hide();
        },
        expand_node : function($nodes) {
            if(this.data('disabled') == 1)
                return;

            $nodes.find('>.toggle').html(down_arrow).data('expanded', 1); // vv
            $nodes.find('>.tree-node').show();
        },
        get_tree : function(data, level) {
            var $this = this;
            if(typeof level == "undefined") {
                level = 0;
            }

            var $tree = $('<div class="tree-node">' + data.name + '</div>');
            $tree.data('id', data.id);
            $tree.data('value', data.name);
            if(level != 0) {
                $tree.hide();
            }
            var $input = $('<input name="'+this.attr('name')+'['+data.id+']" type="checkbox"/>');
            if(data.selected) {
                $input.attr('checked', 'checked');
            }
            $tree.prepend($input);

            if(data.children) {
                $tree.prepend($('<span class="toggle" data-expanded="0">' + right_arrow + '</span>'));
                $.each(data.children, function(idx){
                    $tree.append($this.treasy('get_tree', data.children[idx], level+1));
                });
            }
            else {
                $tree.prepend($('<span class="no-toggle"></span>'));
            }
            $tree.data('level', level);

            return $tree;
        },
        reveal_all_checked : function() {
            var $this_tree = this;
            $.each(this.find(':checked').parent(), function() {
                var $this = $(this);
                $this_tree.treasy('expand_node', $this.parents('.tree-node'));
            })
        },
        show_all : function() {
            var $this_tree = this;
            $.each(this.find('.tree-node>.tree-node'), function() {
                var $this = $(this);
                $this_tree.treasy('expand_node', $this.parents('.tree-node'));
            })
        },
        hide_all : function() {
            this.treasy('collapse_node', $('.tree-node'));
        },
        enable : function() {
            this.data('disabled', 0);
        },
        disable : function() {
            this.data('disabled', 1);
        },
        is_disabled : function() {
            return this.data('disabled') == 1 ? 'yes' : 'no';
        }
    };


    // "private" methods
    var assign_toggle_events = function($this_tree, $toggles) {
        $toggles.on('click.tree', function() {
            if($this_tree.data('disabled') == 1)
                return;

            var $this = $(this);
            if($this.data('expanded')) {
                $this_tree.treasy('collapse_node', $this.parent())
            }
            else {
                $this_tree.treasy('expand_node', $this.parent())
            }
        });
    }

    jQuery.fn.treasy = function(method) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tree' );
        }

        return this;
    };
})( jQuery );