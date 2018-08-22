//fetch
// function fetchAlbums() {
//   fetch("http://rallycoding.herokuapp.com/api/music_albums")
//     .then(res => res.json())
//     .then(json => console.log(json));
// }
const fetchAlbums = async () => {
  const res = await fetch("http://rallycoding.herokuapp.com/api/music_albums");
  const json = await res.json();
  console.log("middle");
  console.log(json);
  console.log("last");
};
fetchAlbums();
