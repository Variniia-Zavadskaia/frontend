// export function Explore(params) {
//     return (
//         <section>

//         <div className="explore">
//             <div className="item tall">
//                 <img src=" https://picsum.photos/300/500" alt="Post 1" />
//             </div>
//             <div className="item wide">
//                 <img src="https://via.placeholder.com/500x300" alt="Post 2" />
//             </div>
//             <div className="item">
//                 <img src="https://source.unsplash.com/random/300x300" alt="Post 3" />
//             </div>
//             <div className="item">
//                 <img src=" https://loremflickr.com/300/300" alt="Post 4" />
//             </div>
//             <div className="item tall">
//                 <img src=" https://picsum.photos/300/500" alt="Post 5" />
//             </div>
//             <div className="item wide">
//                 <img src="https://via.placeholder.com/500x300" alt="Post 6" />
//             </div>
//         </div>
//         </section>
//     )
// }

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
