import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

export default function SearchForm({ query }: { query?: string }) {
  return (
    <Form action='/' scroll={false} className='search-form'>
      <Input
        name='query'
        defaultValue={query}
        className='search-input'
        placeholder='Seatch Startups'
      />

      {query && <SearchFormReset />}
      <button className='search-btn text-white'>
        <Search />
      </button>
    </Form>
  );
}
