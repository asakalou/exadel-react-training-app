import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import GifItem from "./GifItem";

describe('<GifItem/>', () => {


    it('should render props correctly', () => {
        const gifItem = shallow(<GifItem url="gif_url" alt="alt text"/>);

        const img = gifItem.find('img');

        expect(img.prop('src')).toEqual('gif_url');
        expect(img.prop('alt')).toEqual('alt text');

    });

    it('should render snapshot correctly', () => {
        const tree = renderer
            .create(<GifItem url="url" alt="alt"/>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })


});