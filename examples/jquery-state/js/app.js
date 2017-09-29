/*global jQuery, Handlebars, Router */
jQuery(function ($) {
	'use strict';

	Handlebars.registerHelper('eq', function (a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	var util = {
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},
		store: function (namespace, data) {
			if (arguments.length > 1) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || {todos:[]};
			}
		}
	};

	var App = {
		init: function () {
			$.state.set(util.store('todos-jquery'));
			this.todoTemplate = Handlebars.compile($('#todo-template').html());
			this.footerTemplate = Handlebars.compile($('#footer-template').html());
			this.bindEvents();

			new Router({
				'/:filter': function (filter) {
					$.state.set({filter:filter});
				}.bind(this)
			}).init('/all');
		},
		bindEvents: function () {
			$('#new-todo').on('keyup', this.create.bind(this));
			$('#toggle-all').on('change', this.toggleAll.bind(this));
			$('#footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));
			$('#todo-list')
				.on('change', '.toggle', this.toggle.bind(this))
				.on('dblclick', 'label', this.editingMode.bind(this))
				.on('keyup', '.edit', this.editKeyup.bind(this))
				.on('focusout', '.edit', this.update.bind(this))
				.on('click', '.destroy', this.destroy.bind(this));

			$.state.on('state', this.render.bind(this));
		},
		render: function () {
			var todos = this.getFilteredTodos();
			$('#todo-list').html(this.todoTemplate(todos));
			$('#main').toggle(todos.length > 0);
			$('#toggle-all').prop('checked', this.getActiveTodos().length === 0);
			this.renderFooter();
			$('#new-todo').focus();
			util.store('todos-jquery', $.state.get());
		},
		renderFooter: function () {
			var todoCount = $.state.get().todos.length;
			var activeTodoCount = this.getActiveTodos().length;
			var template = this.footerTemplate({
				activeTodoCount: activeTodoCount,
				activeTodoWord: util.pluralize(activeTodoCount, 'item'),
				completedTodos: todoCount - activeTodoCount,
				filter: $.state.get().filter
			});

			$('#footer').toggle(todoCount > 0).html(template);
		},
		toggleAll: function (e) {
			var isChecked = $(e.target).prop('checked');
			var todos = $.state.get().todos;

			todos.forEach(function (todo) {
				todo.completed = isChecked;
			});

			$.state.set({todos:todos});
		},
		getActiveTodos: function () {
			return $.state.get().todos.filter(function(todo) { return !todo.completed; });
		},
		getCompletedTodos: function () {
			return $.state.get().todos.filter(function(todo) { return todo.completed; });
		},
		getFilteredTodos: function () {
			if ($.state.get().filter === 'active') {
				return this.getActiveTodos();
			}

			if ($.state.get().filter === 'completed') {
				return this.getCompletedTodos();
			}

			return $.state.get().todos;
		},
		destroyCompleted: function () {
			$.state.set({filter:'all',todos:this.getActiveTodos()});
		},
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
		getIndexFromEl: function (el) {
			var id = $(el).closest('li').data('id');
			var todos = $.state.get().todos;
			var i = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},
		create: function (e) {
			var $input = $(e.target);
			var val = $input.val().trim();

			if (e.which !== ENTER_KEY || !val) {
				return;
			}

			$.state.set({todos:$.state.get().todos.concat({
				id: util.uuid(),
				title: val,
				completed: false
			})});

			$input.val('');
		},
		toggle: function (e) {
			var todos = $.state.get().todos;
			todos[this.getIndexFromEl(e.target)].completed = !todos[this.getIndexFromEl(e.target)].completed;
			$.state.set({todos:todos});
		},
		editingMode: function (e) {
			var $input = $(e.target).closest('li').addClass('editing').find('.edit');
			var val = $input.val();
			$input.val('').focus().val(val);
		},
		editKeyup: function (e) {
			if (e.which === ENTER_KEY) {
				e.target.blur();
			}

			if (e.which === ESCAPE_KEY) {
				$(e.target).data('abort', true).blur();
			}
		},
		update: function (e) {
			var el = e.target;
			var $el = $(el);
			var val = $el.val().trim();

			if (!val) {
				this.destroy(e);
				return;
			}

			if ($el.data('abort')) {
				$el.data('abort', false);
				this.render();
			} else {
				var todos = $.state.get().todos;
				todos[this.getIndexFromEl(el)].title = val;
				$.state.set({todos:todos});
			}
		},
		destroy: function (e) {
			var todos = $.state.get().todos;
			todos.splice(this.getIndexFromEl(e.target), 1);
			$.state.set({todos:todos});
		}
	};

	App.init();
});
