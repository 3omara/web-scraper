export async function stream_reader(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let data = ""

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    data += decoder.decode(value, { stream: true });
  }
  return data;
};
