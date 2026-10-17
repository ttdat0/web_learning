import type { Topic } from '../data/topics';

/** Mặt thẻ chủ đề trên màn hình chính. */
export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div className="topic-card" style={{ background: topic.gradient }}>
      <div className="topic-card__icon">{topic.icon}</div>
      <div className="topic-card__name">{topic.name}</div>
      <div className="topic-card__count">{topic.items.length} thẻ</div>
    </div>
  );
}
