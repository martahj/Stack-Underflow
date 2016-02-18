
exports.up = function(knex, Promise) {


    return Promise.all([

        knex.schema.createTable('users', function(table) {
            table.increments('userid').primary();
            table.string('username');
            table.string('makerpassuuid');
        }),

        knex.schema.createTable('questions', function(table){
            table.increments('questionid').primary();
            table.string('questiontitle');
            table.string('questiontext');
            table.integer('fk_askedbyuserid')
                 .references('userid')
                 .inTable('users');
            table.dateTime('questiondate');
        }),

        knex.schema.createTable('answers', function(table){
            table.increments('answerid').primary();
            table.string('answertext');
            table.integer('fk_questionid')
                 .references('questionid')
                 .inTable('questions');
            table.integer('fk_answeredbyuserid')
                 .references('userid')
                 .inTable('users');
            table.dateTime('answerdate');
        }),

        knex.schema.createTable('answerrating', function(table){
            table.increments('ratingid').primary();
            table.integer('fk_answerid')
                 .references('answerid')
                 .inTable('answers');
            table.integer('fk_votedbyuserid')
                 .references('userid')
                 .inTable('users');
        })
    ])
};

exports.down = function(knex, Promise) {  
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('questions'),
        knex.schema.dropTable('answers'),
        knex.schema.dropTable('answerrating')
    ])
};
