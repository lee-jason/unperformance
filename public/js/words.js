define([], function () {
  return {
    getWord: function (count) {
      output = [];
      var count = count || 0;
      for (var i = 0; i < count; i++) {
        output.push(words.words[Math.floor(Math.random() * words.words.length)]);
      }
      return output.join(' ');
    }
  };
});