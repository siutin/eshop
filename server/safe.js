export default function safe(promise) {
  return promise.then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}
