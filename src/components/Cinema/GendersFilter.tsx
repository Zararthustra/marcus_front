import { movieTags } from '@data/tags';
import { Radio } from 'antd';

interface IGendersFilterProps {
  setTag: (tag: string) => void;
  tag: string;
}
const GendersFilter = ({ tag, setTag }: IGendersFilterProps) => {
  return (
    <div className="tag--primary br-m">
      <Radio.Group
        className="p-05 flex justify-center align-center flex-wrap"
        onChange={(e) => setTag(e.target.value)}
        value={tag}>
        {movieTags.map((tag, index) => (
          <Radio key={index} id={tag} value={tag} style={{ fontWeight: 300 }}>
            {tag}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default GendersFilter;
