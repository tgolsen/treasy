#treasy

Treasy is a jQuery extension that takes hierarchical data and displays it as a expandable/collapsable tree.

## Intro:
    $('#element').treasy(data);

Treasy is a jQuery plugin that takes hierarchical data and creates a form-friendly tree with checkboxes to select nodes. The branches of the tree are expandable and collapsible, and

Tree data nodes should have `name` properties. Properties `children` and `id` are technically optional, but ids are generally useful for collecting data, and a tree without child nodes is hardly a tree.

More information is available in the [Treasy Demo](doc/demo.html).

## Setup
Treasy is meant to be easy. First, have some parent-child related data you want to show in a tree. Tree data is structured like this:

    var tree_data = {
        node1 : {
            id : "1",
            name : "node 1",
            selected: 1,
            children : {
                node11 : {
                    id : "11",
                    name : "node 11",
                    selected: 0
                },
                node12 : {
                    id : "12",
                    name : "node 12",
                    selected: 0
                }
            }
        }

Make a block element to hold the tree. The element should have a `name` attribute, this will be used in all of the treasy input tags.

    <form id="tree" name="tree"></form>

Call treasy:

    $('#tree').treasy(tree_data)

That's it! Please see [Treasy Demo](doc/demo.html) for a demo and more information.

## Output and Public Methods
A single Treasy node looks like this:

    <div class="tree-node">
        <span class="toggle"></span>
        <label class="checkbox inline">
            <input name="tree2[11]" type="checkbox">node 11
        </label>
    </div>

### Methods

Call methods with `$ele.treasy('method', arg1, arg2, ...)`

####`init(data)` or `$ele.treasy(data)`
Initialize a treasy element. `data` is the tree data.
####`get_selected_ids()`
Return an array of the ids of the selected items.
####`get_selected_values()`
Return an array of the values of the selected items.
####`list_selected(join)`
If `join` is defined, it returns a string of all selected item values with `join` as the delimiter. If `join` is not defined, returns the array
####`collapse_node($nodes)`
Collapse the specified node(s).
####`expand_node($nodes)`
Expand the specified node(s).
####`get_tree(data, level)`
Called recursively to get the branches of the tree. Argument `level` is the depth of the branch, level 0 is root.
####`reveal_all_checked()`
Expose all checked nodes by expanding all of their parents.
####`show_all()`
Expand all nodes.
####`hide_all()`
Collapse all nodes
####`disable()`
Disable expansion and collapse of nodes.
####`enable()`
Enable expansion and collapse of nodes.
####`is_disabled()`
Return whether expanding/collapsing is currently disabled.





##### License [from "Simplified BSD License"]:
 Copyright (c) 2013, Ted Olsen
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 The views and conclusions contained in the software and documentation are those
 of the authors and should not be interpreted as representing official policies,
 either expressed or implied, of the organization.