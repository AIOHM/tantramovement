
import { useState } from 'react';

type TabType = 'all' | 'drafts' | 'published';

interface BlogFilterProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

const BlogFilter = ({ activeTab, onChange }: BlogFilterProps) => {
  return (
    <div className="tabs flex border-b border-chocolate/10">
      <button
        onClick={() => onChange('all')}
        className={`py-2 px-4 ${activeTab === 'all' ? 'border-b-2 border-wine-red font-medium text-wine-red' : 'text-chocolate/70'}`}
      >
        All Posts
      </button>
      <button
        onClick={() => onChange('published')}
        className={`py-2 px-4 ${activeTab === 'published' ? 'border-b-2 border-wine-red font-medium text-wine-red' : 'text-chocolate/70'}`}
      >
        Published
      </button>
      <button
        onClick={() => onChange('drafts')}
        className={`py-2 px-4 ${activeTab === 'drafts' ? 'border-b-2 border-wine-red font-medium text-wine-red' : 'text-chocolate/70'}`}
      >
        Drafts
      </button>
    </div>
  );
};

export default BlogFilter;
