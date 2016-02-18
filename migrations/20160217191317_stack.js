
exports.up = function(knex, Promise) {


    return Promise.all([

        knex.schema.createTableIfNotExists('users', function(table) {
            table.increments('userid').primary();
            table.string('username');
            table.string('makerpassuuid');
        }),

        knex.schema.createTableIfNotExists('questions', function(table){
            table.increments('questionid').primary();
            table.string('questiontitle');
            table.string('questiontext');
            table.integer('fk_questionaskedbyid')
                 .references('userid')
                 .inTable('users');
            table.dateTime('questiondate');
        }),

        knex.schema.createTableIfNotExists('answers', function(table) {
        	table.increments('answerid').primary();
            table.integer('fk_questionid')
                 .references('questionid')
                 .inTable('questions');
            table.string('answertext');
            table.integer('fk_answeredbyid')
                 .references('userid')
                 .inTable('users');
            table.dateTime('answerdate');
        }),

        knex.schema.createTableIfNotExists('answerrating', function(table){
            table.increments('ratingid').primary();
            table.integer('fk_answerid')
                 .references('answerid')
                 .inTable('answers');
            table.integer('fk_ratedbyid')
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


