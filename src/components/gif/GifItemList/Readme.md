List with multiple items

```js
const items = [
                      {
                          id: '1', slug: 'Example Image',
                          images: {fixed_width: {url: 'https://media3.giphy.com/media/tA8p2hy4KR29i/200w.gif'}}
                      },
                      {
                          id: '2', slug: 'Example Image',
                          images: {fixed_width: {url: 'https://media1.tenor.com/images/e140acad61c8e94f3d45f8e16076e509/tenor.gif?itemid=5727127'}}
                      }
                  ];
<GifItemList 
    items={items}
/>
```