import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from '@/registry/new-york/ui/item/components/item'

const MUSICS = [
  {
    title: 'Midnight City Lights',
    artist: 'Neon Dreams',
    album: 'Electric Nights',
    duration: '3:45'
  },
  {
    title: 'Coffee Shop Conversations',
    artist: 'The Morning Brew',
    album: 'Urban Stories',
    duration: '4:05'
  },
  {
    title: 'Digital Rain',
    artist: 'Cyber Symphony',
    album: 'Binary Beats',
    duration: '3:30'
  }
]

// Component
export const ItemImage = () => {
  // Template
  return (
    <div className='flex w-full max-w-md flex-col gap-6'>
      <ItemGroup className='gap-4'>
        {MUSICS.map((song) => (
          <Item asChild key={song.title} role='listitem' variant='outline'>
            {/** biome-ignore lint/a11y/useValidAnchor: ignore */}
            <a href='#'>
              <ItemMedia variant='image'>
                <img
                  alt={song.title}
                  className='object-cover grayscale'
                  height={32}
                  src={`https://avatar.vercel.sh/${song.title}`}
                  width={32}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className='line-clamp-1'>
                  {song.title} - <span className='text-muted-foreground'>{song.album}</span>
                </ItemTitle>
                <ItemDescription>{song.artist}</ItemDescription>
              </ItemContent>
              <ItemContent className='flex-none text-center'>
                <ItemDescription>{song.duration}</ItemDescription>
              </ItemContent>
            </a>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
