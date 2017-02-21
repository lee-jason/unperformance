define([
  'backbone',
  'text!app/DataAnalysisTemplate'
], function (
  Backbone,
  DataAnalysisTemplate
) {

  var DataAnalysis = Backbone.View.extend({
    className: 'data-analysis-backbone',
    events: {
      "click .wordCount":  "wordCount",
      "click .charCount":  "charCount",
      "click .vowelCount": "vowelCount"
    },

    wordCount: function () {
      var wordCount = 0;
      for (var i = 0; i < this.model.length; i++) {
        for (var j = 0; j < this.model[i].length; j++) {
          wordCount += this.model[i][j].split(/\s+/).length;
        }
      }
      this.$('.result').html(wordCount);
    },

    charCount: function () {
      // var charCount
    },

    vowelCount: function () {

    },

    render: function () {
      this.$el.html(DataAnalysisTemplate);
    }
  });

  return DataAnalysis;
});