module.exports = {
  name: 'github-user-search-ui-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/github-user-search/ui-shell',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
