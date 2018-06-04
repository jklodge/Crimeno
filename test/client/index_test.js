/* global describe it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import IndexRoute from '../../src/components/crimes/IndexRoute';

describe('Crimes tests', () => {

  it('should render crime button length', done => {
    const wrapper = shallow(<IndexRoute />);
    expect(wrapper.find('button').length).to.equal(1);
    done();
  });
});
