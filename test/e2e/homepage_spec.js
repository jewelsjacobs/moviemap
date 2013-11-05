'use strict';

describe('homepage', function() {

  var ptor = protractor.getInstance();

  it('header should be Allo Allo', function() {
    ptor.get('/#');
    expect(ptor.findElement(protractor.By.tagName('h1')).getText()).toBe("'Allo, 'Allo!");
  });

});
