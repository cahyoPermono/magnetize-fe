export default defineNuxtPlugin(() => {
  const isRequired = (value) => {
    if (!value) {
      return "This field is required";
    }
    return true;
  };

  // You can alternatively use this format, which comes with automatic type support
  return {
    provide: {
      required: isRequired
    }
  }
});