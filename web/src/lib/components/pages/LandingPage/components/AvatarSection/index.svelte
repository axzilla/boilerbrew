<script lang="ts">
	import { SectionContainer } from '..';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import AvatarSarah from './avatars/sarah.jpg';
	import AvatarMichael from './avatars/michael.jpg';
	import AvatarEmma from './avatars/emma.jpg';
	import AvatarDavid from './avatars/david.jpg';
	import AvatarOlivia from './avatars/olivia.jpg';
	import AvatarThomas from './avatars/thomas.jpg';

	const title = 'What Our Users Say';
	const subtitle = 'Real Talk from Real Users';

	const testimonials = [
		{
			name: 'Sarah Johnson',
			role: 'Marketing Guru',
			company: 'TechCorp',
			content: `Holy smokes! This app turned our lazy team into productivity ninjas. We're crushing goals like it's a video game. Level up!`,
			avatar: AvatarSarah
		},
		{
			name: 'Michael Chen',
			role: 'Design Wizard',
			company: 'Freelance Land',
			content: `Juggling projects used to be my circus act. Now? I'm the ringmaster of deadlines. Clients think I have a secret clone!`,
			avatar: AvatarMichael
		},
		{
			name: 'Emma Rodriguez',
			role: 'Startup Queen',
			company: 'InnovateTech',
			content: `This tool is like Red Bull for my startup. We're zooming past milestones so fast, I think we broke the space-time continuum!`,
			avatar: AvatarEmma
		},
		{
			name: 'David Kim',
			role: 'Product Mastermind',
			company: 'GlobalSoft',
			content: `The AI in this thing? It's like having a crystal ball for product development. We're fixing problems before they even happen. Spooky stuff!`,
			avatar: AvatarDavid
		},
		{
			name: 'Olivia Patel',
			role: 'HR Superhero',
			company: 'TalentForce',
			content: `Our HR department went from 'The Office' to 'The Avengers'. Performance reviews? More like victory laps now!`,
			avatar: AvatarOlivia
		},
		{
			name: 'Thomas Müller',
			role: 'Sales Rockstar',
			company: 'EuroTech Solutions',
			content: `Tracking goals with this app is addictive! My team's competing so hard, I might need to start a fantasy sales league.`,
			avatar: AvatarThomas
		}
	];

	const stats = [
		{ value: '10,000+', label: 'Goal Crushers' },
		{ value: '1M+', label: 'Dreams Achieved' },
		{ value: '4.8/5', label: 'Mind-Blown Users' }
	];
</script>

<SectionContainer {title} {subtitle} id="testimonials" contentClass="max-w-6xl">
	<div class="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3">
		{#each testimonials as testimonial}
			<Card.Root>
				<Card.Content class="p-6">
					<div class="mb-4 flex items-center space-x-4">
						<Avatar.Root>
							<Avatar.Image src={testimonial.avatar} alt={testimonial.name} />
							<Avatar.Fallback>{testimonial.name[0]}</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<p class="font-semibold">{testimonial.name}</p>
							<p class="text-sm text-muted-foreground">
								{testimonial.role} at {testimonial.company}
							</p>
						</div>
					</div>
					<p class="text-muted-foreground">"{testimonial.content}"</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
	<div class="grid gap-8 md:grid-cols-3">
		{#each stats as stat}
			<div class="text-center">
				<p class="text-3xl font-bold text-primary">{stat.value}</p>
				<p class="text-muted-foreground">{stat.label}</p>
			</div>
		{/each}
	</div>
</SectionContainer>
