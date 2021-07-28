const spotify = link => {
  return `<iframe src="${link.replace('spotify.com/','spotify.com/embed/')}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
}
const soundcloud = link => {
  return `<iframe allowtransparency="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/icon/?url=${encodeURI(link)}&color=black_white&size=32" style="width: 32px; height: 32px;"></iframe>`;
}

const players = {
  spotify,
  soundcloud,
}
export default players;