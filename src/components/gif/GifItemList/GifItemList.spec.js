import React from 'react';
import {shallow} from 'enzyme';
import GifItemList from './GifItemList';
import GifItem from "../GifItem/GifItem";

describe('<GifItemList/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<GifItemList items={[]}/>);
    });

    it('should render correct number of <GifItemList/>', () => {
        const items = [
            {
                id: 1,
                slug: 'slug 1',
                images: {
                    fixed_width: {url: '1'}
                }
            },
            {
                id: 2,
                slug: 'slug 2',
                images: {
                    fixed_width: {url: '2'}
                }
            }
        ];
        wrapper.setProps({items});

        expect(wrapper.find(GifItem).length).toEqual(items.length);
    });


});