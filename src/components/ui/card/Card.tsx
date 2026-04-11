import type { CardProps } from "../../../types";
import Button from "../button/Button";

const Card = ({
  image,
  instructor,
  duration,
  rating,
  title,
  category,
  price,
}: CardProps) => {
  return (
    <div className="course-card">
      <img className="thumbnail" src={image} />

      <div className="card-body">
        <div className="meta">
          <span className="instructor">{instructor}</span>
          <span className="divider">|</span>
          <span className="duration">{duration} Weeks</span>
          <div className="rating">
            <img className="star-icon" />
            <span className="score">{rating}</span>
          </div>
        </div>

        <h2 className="title">{title}</h2>

        <div className="category-badge">
          <img className="category-icon" />
          <span className="category-name">{category}</span>
        </div>

        <div className="card-footer">
          <div className="price">
            <span className="starting-from">Starting from</span>
            <span className="amount">${price}</span>
          </div>
          <Button children="Details" variant="primary" />
        </div>
      </div>
    </div>
  );
};

export default Card;
