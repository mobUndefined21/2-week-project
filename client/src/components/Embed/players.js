const spotify = link => {
  return `<iframe src="${link.replace('spotify.com/','spotify.com/embed/')}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
}
const soundcloud = link => {
  return `<iframe width="400" height="115" scrolling="no" frameborder="no" allow="autoplay" 
  src="https://w.soundcloud.com/player/?url=${link}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>`;
}
const bandcamp = link => {
  return link;
}
const players = {
  spotify,
  soundcloud,
  bandcamp,
}
export default players;