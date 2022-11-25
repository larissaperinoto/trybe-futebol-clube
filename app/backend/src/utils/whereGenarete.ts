export default function whereGenerate(query: boolean) {
  if (query) {
    return {
      where: {
        inProgress: query,
      },
    };
  }
}
