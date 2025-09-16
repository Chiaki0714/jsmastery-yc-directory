import { defineQuery } from 'next-sanity';

// アーカイブ(検索機能つき)
export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio, slug
  }, 
  views,
  description,
  category,
  image,
}`);

export const STARTUP_BY_SLUG_QUERY =
  defineQuery(`*[_type == "startup" && slug.current == $slug][0]{
   _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio, slug
  }, 
  views,
  description,
  category,
  image,
  pitch,
  }`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type == "startup" && slug.current == $slug][0]{
    _id, slug, views
  }
`);

// ログイン時author登録用
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && githubId == $githubId][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

// ページ表示用
export const AUTHOR_BY_USERNAME_QUERY = defineQuery(`
  *[_type == "author" && username == $username][0]{
    _id,
    githubId,
    name,
    username,
    email,
    image,
    bio
  }
`);
