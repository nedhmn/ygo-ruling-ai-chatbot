const Footnote = () => {
  return (
    <div className="text-muted-foreground text-xs mt-2">
      This is an AI chatbot using{" "}
      <a
        className="underline text-primary"
        href="https://www.pinecone.io/learn/retrieval-augmented-generation/"
        target="_blank"
        rel="noreferrer"
      >
        RAG
      </a>
      . It is trained on{" "}
      <a
        className="underline text-primary"
        href="https://www.goatformat.com/whatisgoat.html"
        target="_blank"
        rel="noreferrer"
      >
        GOAT Format Yu-Gi-Oh!
      </a>{" "}
      rulings only.
    </div>
  );
};

export default Footnote;
