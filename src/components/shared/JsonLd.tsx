/**
 * The payload is built from dashboard input (project titles and summaries), so
 * a `</script>` in that text would otherwise close this tag and let the rest
 * of the string run as markup. `<` is not valid inside a JSON string literal
 * anyway, so escaping it changes nothing a parser sees.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

export default JsonLd;
