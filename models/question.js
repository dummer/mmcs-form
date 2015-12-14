module.exports = function(sequelize, DataTypes) {
    var question = sequelize.define("question", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        text: {
            type: DataTypes.TEXT,
            notNull: true
        },
        feedback_form_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            references: {
                model: "feedback_forms",
                key: "id"
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        }
    },
        {
            classMethods: { }
        });

    return question;
};
