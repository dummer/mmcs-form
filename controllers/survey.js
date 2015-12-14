var authController = require('../controllers/auth');
var brsDataController = require('../controllers/brs');

module.exports =
{
    authModule : authController,
    getTestData : function() {
        var json = '{"feedbackForm": [{"title": "Насколько полезен с вашей точки зрения данный предмет?","type": "radio","options": ["5","4","3","2","1"]}]}';
        return JSON.parse(json)['feedbackForm'];
    },

    getStageDescriptions : function() {
        var groupId = authController.getGroupId(); // TODO возможно, запрос к БРС
        var userId  = authController.isStudentAuthorized();

        // TODO теперь нужно получить локально актуальные (по дате и groupID, не должно быть для acc_id и stage_d_id в voted_users)
        // TODO stage_description_id, teacher_id, subject_id, feedback_form_id
        // TODO сделать запросы на БРС для получения имени учителя и названия предметая, расширить текущий массив

        // TODO вернуть этот безумный массив для парсинга селектора
        // TODO сохранить его в сессии для хранения айдишников (чтобы потом проще сэйвить в БД)
    }
};