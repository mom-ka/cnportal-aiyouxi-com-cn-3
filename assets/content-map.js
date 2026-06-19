// assets/content-map.js
// Site content sections, keyword tags, and search filter helper for cnportal-aiyouxi.com.cn

const contentMap = {
  siteUrl: "https://cnportal-aiyouxi.com.cn",
  primaryKeyword: "爱游戏",
  sections: {
    home: {
      id: "home",
      title: "首页",
      tags: ["爱游戏", "精选", "推荐"],
      items: [
        { title: "热门游戏", slug: "hot-games", keywords: ["爱游戏", "热门", "新游"] },
        { title: "本周更新", slug: "weekly-update", keywords: ["更新", "活动"] }
      ]
    },
    news: {
      id: "news",
      title: "新闻中心",
      tags: ["爱游戏", "资讯", "公告"],
      items: [
        { title: "行业动态", slug: "industry-news", keywords: ["爱游戏", "行业", "动态"] },
        { title: "官方公告", slug: "official-announcement", keywords: ["公告", "版本"] }
      ]
    },
    games: {
      id: "games",
      title: "游戏库",
      tags: ["爱游戏", "游戏", "分类"],
      items: [
        { title: "动作游戏", slug: "action", keywords: ["动作", "格斗"] },
        { title: "策略游戏", slug: "strategy", keywords: ["策略", "塔防"] },
        { title: "休闲游戏", slug: "casual", keywords: ["休闲", "益智"] }
      ]
    },
    community: {
      id: "community",
      title: "社区",
      tags: ["爱游戏", "论坛", "玩家"],
      items: [
        { title: "讨论区", slug: "forum", keywords: ["讨论", "攻略"] },
        { title: "创作中心", slug: "creation", keywords: ["创作", "分享"] }
      ]
    }
  }
};

// Search filter function: returns matching items based on query
function searchContent(query, sections = contentMap.sections) {
  const results = [];
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return results;

  for (const sectionKey in sections) {
    const section = sections[sectionKey];
    // Search in section tags
    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    if (tagMatch) {
      results.push({ type: "section", section: section.title, title: section.title, slug: section.id });
    }
    // Search in items
    for (const item of section.items) {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const keywordMatch = item.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
      if (titleMatch || keywordMatch) {
        results.push({
          type: "item",
          section: section.title,
          title: item.title,
          slug: item.slug,
          matchedKeywords: item.keywords.filter(kw => kw.toLowerCase().includes(lowerQuery))
        });
      }
    }
  }
  return results;
}

// Get all tags across all sections (used for tag cloud or filtering)
function getAllTags() {
  const tags = new Set();
  for (const sectionKey in contentMap.sections) {
    const section = contentMap.sections[sectionKey];
    section.tags.forEach(tag => tags.add(tag));
    section.items.forEach(item => item.keywords.forEach(kw => tags.add(kw)));
  }
  return Array.from(tags);
}

// Example usage (uncomment to test):
// console.log(searchContent("爱游戏"));
// console.log(getAllTags());

export { contentMap, searchContent, getAllTags };