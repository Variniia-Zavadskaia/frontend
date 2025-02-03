export function Explore() {
    const images = [
      { url: "https://picsum.photos/300/500?random=1", className: "tall", alt: "Post 1" },
      { url: "https://picsum.photos/500/300?random=2", className: "wide", alt: "Post 2" },
      { url: "https://picsum.photos/300/300?random=3", className: "square", alt: "Post 3" },
      { url: "https://picsum.photos/300/300?random=4", className: "square", alt: "Post 4" },
      { url: "https://picsum.photos/300/500?random=5", className: "tall", alt: "Post 5" },
      { url: "https://picsum.photos/500/300?random=6", className: "wide", alt: "Post 6" },
    ];
  
    return (
      <section>
        <div className="explore-index">
          {images.map((img, idx) => (
            <div key={idx} className={`item ${img.className}`}>
              <img src={img.url} alt={img.alt} />
            </div>
          ))}
        </div>
      </section>
    );
  }
