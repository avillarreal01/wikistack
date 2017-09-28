var Sequelize = require('sequelize');
var marked = require('marked');

var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  tags : {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
}, {
  hooks: {
    beforeValidate: (page, options) => {
      if (page.title) {
        page.urlTitle = page.title.replace(/ /g, '_').replace(/\W/g, '');
      } else {
        page.urlTitle = Math.random().toString(36).substring(2, 7);
      }
    }
  },
  getterMethods: {
    route: function () {
      return '/wiki/' + this.urlTitle;
    },
    renderedContent: function () {
      return marked(this.content);
    }
  }
});

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, {
  as: 'author'
});

module.exports = {
  db: db,
  Page: Page,
  User: User
};
