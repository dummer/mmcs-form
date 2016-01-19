/* Called when page was loaded. */
$(document).ready(function() {
    // $.getScript("/js/utils.js"); // async import script
});

/* Namespace for stages scripts. */
var stages = {

    /**
     * Appends stage item with description to collection list.
     * @param {Object} node A collection object where to add item.
     * @param {Number} id Stage's ID (needed for further delete).
     * @param {Date} dateFrom The date of stage's beginning.
     * @param {Date} dateTo The date of stage's ending.
     * @param {String} formName Used form in that stage.
     * @param {Array} stageDescriptions An array of discipline used for that stage.
     * */
    appendStageToStagesList: function(node, id, dateFrom, dateTo, formName, stageDescriptions) {
        /* First part of stage element. */
        var stageItemHtml = '' +
            '<li class="collection-item">' +
            // Date row.
            '<div>Дата проведения: <b>с ' + utils.formatDateForStage(dateFrom) + ' по ' + utils.formatDateForStage(dateTo) + '</b>';

        /* Used form row. */
        stageItemHtml = stageItemHtml + '<br>Используется форма <i>' + formName + '</i>';


        /* Disciplines start block. */
        stageItemHtml = stageItemHtml + '<br>Для дисциплин: <i>';

        /* Adding disciplines descriptions. */
        for (var stageDescriptionIndex in stageDescriptions) {
            var stageDescription = stageDescriptions[stageDescriptionIndex];
            var discipline = stageDescription['discipline'];
            stageItemHtml += '<br>&nbsp&nbsp&nbsp&nbsp&nbsp' + discipline['subject']
                + ' (' + discipline['teacher'] + ') '
                + 'в группе ' + discipline['group'];
        }

        /* Discipline end block. */
        stageItemHtml = stageItemHtml + '</i>';


        /* Adding delete button. */
        stageItemHtml += '' +
            // This button will show deletion prompt first in modal dialog.
            '<a href="#deleteStage" class="secondary-content modal-trigger">' +
            '<i id="' + id + '" class="material-icons red-text text-lighten-3">delete</i>' +
            '</a>';


        /* Closing stage block. */
        stageItemHtml = stageItemHtml +
            '</div>' +
            '</li>';


        /* Converting html code to object to add listener for button. */
        stageItemHtml = $($.parseHTML(stageItemHtml));

        // Adding onclick listener.
        stageItemHtml.find('i#'+id).on('click', stages.prepareDeletionModal);


        /* And finally adding row to list. */
        node.append(stageItemHtml);
    },

    /**
     * Initiates modal deletion dialog buttons actions.
     * */
    prepareDeletionModal: function() {
        /* Getting stage ID which will be deleted. */
        var stageIdToDelete = $(this).attr('id');

        /* Getting UI button to set onclick listener. */
        var btnSubmit = $('.modal #submitDeletion');

        /* Onclick deletion listener. */
        btnSubmit.off('click'); // removing old listeners first
        btnSubmit.on('click', function() { stages.deleteStage(stageIdToDelete) });
    },

    /**
     * Deletes chosen stage.
     * */
    deleteStage: function(stageID) {
        /* Describing delete request for stage. */
        var request = $.ajax({
            url: '/maintaining/stage',
            method: 'DELETE',
            data: { id : stageID },
            dataType: "json"
        });
        /* Deleting stage from list, if everything is ok. */
        request.done(function(response) {
            $('.modal #cancelDeletion').click(); // closing dialog
            $('i#' + stageID).parents('.collection-item').first().remove();
        });
        /* Showing an error in another case. */
        request.fail(function(jqXHR, textStatus) {
            Materialize.toast('Не удалось удалить опрос ' + stageID, 5000)
        });
    }

};