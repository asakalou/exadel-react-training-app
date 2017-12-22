import React from 'react';
import {shallow} from 'enzyme';
import {Home} from './Home';


describe('<Home/>', () => {

    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            query: 'query',
            items: [{
                id: 1,
                images: {
                    fixed_width: {url: 'url 1'}
                },
                slug: 'slug 1'
            }],
            pageSize: 20,
            totalItems: 10,
            onLoadCancel: jest.fn(),
            onSearch: jest.fn(),
            onQueryChange: jest.fn(),
            onPageSizeChange: jest.fn()
        };
        wrapper = shallow(<Home {...props}/>);
    });

    it('should call onSearch if on search form submit', () => {
        const initialLength = props.onSearch.mock.calls.length;

        wrapper.find('.gs-home-query-form')
            .simulate('submit', {
                preventDefault: () => {
                }
            });

        expect(props.onSearch.mock.calls.length).toBe(initialLength + 1);
    });

    it('should call onQueryChange if query value changes', () => {
        expect(props.onQueryChange.mock.calls.length).toBe(0);

        wrapper.find('.gs-home-query')
            .simulate('change', {target: {value: 'query'}});

        expect(props.onQueryChange.mock.calls.length).toBe(1);
        expect(props.onQueryChange.mock.calls[0][0]).toBe('query');
    });

    // temporary disabling since there is no page size change functionality on the page now
    xit('should call onPageSizeChange if pageSize value changes', () => {
        expect(props.onPageSizeChange.mock.calls.length).toBe(0);

        wrapper.find('#pageSize')
            .simulate('change', {target: {value: 5}});

        expect(props.onPageSizeChange.mock.calls.length).toBe(1);
        expect(props.onPageSizeChange.mock.calls[0][0]).toBe(5);
    });

    it('should display loadMoreButton if there are more items to load', () => {
        const newProps = {
            ...props,
            totalItems: 5,
            hasMoreItems: true,
            items: [{}]
        };

        wrapper.setProps(newProps);

        expect(wrapper.find('.load-more-btn').length).toBe(1);
    });

    it('should not display loadMoreButton if there are no items to load', () => {
        const newProps = {
            ...props,
            totalItems: 1,
            hasMoreItems: false,
            items: [{}]
        };

        wrapper.setProps(newProps);

        expect(wrapper.find('.load-more-btn').length).toBe(0);
    });

    it('should call onLoadCancel onComponentWillUnmount', () => {
        expect(props.onLoadCancel.mock.calls.length).toBe(0);

        wrapper.unmount();

        expect(props.onLoadCancel.mock.calls.length).toBe(1);
    });


});