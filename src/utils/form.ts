export function formDataGenerator(event: React.FormEvent<HTMLFormElement>) {
  const formData: { [key: string]: string } = {};
  new FormData(event.currentTarget).forEach((value: FormDataEntryValue, key: string) => (formData[key] = value as string));

  return formData;
}
