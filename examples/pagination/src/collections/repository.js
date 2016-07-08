module.exports = {

  properties: {
    parse: function(attributes) {
      this.meta = {
        totalCount: attributes.total_count
      };
      return attributes.items;
    }
  }
};
