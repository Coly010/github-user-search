module.exports = {
  name: 'github-user-search',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/github-user-search',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
