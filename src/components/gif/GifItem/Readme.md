Basic example

```js
<GifItem 
    url="https://media3.giphy.com/media/tA8p2hy4KR29i/200w.gif" 
    alt="Example"
/>
```


With favourites but not favourite

```js
<GifItem 
    url="https://media3.giphy.com/media/tA8p2hy4KR29i/200w.gif" 
    alt="Example" 
    fav={true}
    onFavClick={() => alert('Favourite!')}
/>
```


With favourites and favourite

```js
<GifItem 
    url="https://media3.giphy.com/media/tA8p2hy4KR29i/200w.gif" 
    alt="Example" 
    fav={true} 
    favourite={true}
    onFavClick={() => alert('Favourite!')}
/>
```