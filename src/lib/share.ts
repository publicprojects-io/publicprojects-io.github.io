// Share destinations, used by the header's share picker and by each project
// card's Share button. Per spec/lily-design-system-svelte-with-picker-bar:
// Copy Link (the picker's own copy item), Email, LinkedIn, Reddit, Bluesky, and
// Mastodon via mastodonshare.com, which asks for the reader's own instance.
import type { ShareTarget } from '@lilydesignsystem/svelte-share-picker';
import type { Ui } from './ui';

const enc = encodeURIComponent;

export function shareTargets(m: Ui): ShareTarget[] {
	return [
		{ id: 'email', label: m.share.email, href: (url, t) => `mailto:?subject=${enc(t)}&body=${enc(url)}`, newTab: false },
		{ id: 'linkedin', label: m.share.linkedin, href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
		{ id: 'reddit', label: m.share.reddit, href: (url, t) => `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(t)}` },
		{ id: 'bluesky', label: m.share.bluesky, href: (url, t) => `https://bsky.app/intent/compose?text=${enc(`${t} ${url}`)}` },
		{ id: 'mastodon', label: m.share.mastodon, href: (url, t) => `https://mastodonshare.com/?text=${enc(t)}&url=${enc(url)}` }
	];
}
