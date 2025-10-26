import { ArrowRight, Download, Heart, Play, Send, Sparkles, Star, User } from "lucide-react";
import Button from "../shared/buttons/BtnComponent.tsx";

const ButtonTest = () => {
  return (
    <div>
      <Button
        variant='primary'
        icon={Send}
        className='!bg-blue-500 !hover:bg-blue-600'
      >
        Custom Colors
      </Button>

      <Button
        variant='primary'
        icon={Star}
        ripple
      >
        Click Me
      </Button>

      <Button
        variant='primary'
        icon={Star}
        ripple={false}
      >
        No Ripple
      </Button>

      {/* <Button
        variant='primary'
        icon={Send}
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? "Sending..." : "Send"}
      </Button> */}

      <Button
        variant='primary'
        icon={Send}
        disabled
      >
        Disabled
      </Button>

      <Button
        variant='primary'
        icon={Send}
        fullWidth
      >
        Full Width Button
      </Button>

      <Button
        variant='primary'
        icon={ArrowRight}
        iconPosition='right'
      >
        Continue
      </Button>

      <Button
        variant='primary'
        icon={Download}
        iconPosition='left'
      >
        Download
      </Button>

      <Button variant='primary'>Just Text</Button>

      <Button
        variant='primary'
        size='sm'
        icon={Send}
      >
        Small
      </Button>
      <Button
        variant='primary'
        size='md'
        icon={Send}
      >
        Medium
      </Button>
      <Button
        variant='primary'
        size='lg'
        icon={Send}
      >
        Large
      </Button>
      <Button
        variant='primary'
        size='xl'
        icon={Send}
      >
        Extra Large
      </Button>

      <Button
        variant='gradient'
        icon={Sparkles}
      >
        Get Started
      </Button>

      <Button
        variant='glow'
        icon={Star}
      >
        Premium
      </Button>

      <Button
        variant='shine'
        icon={Play}
      >
        Play Video
      </Button>
      <Button
        variant='animated-border'
        icon={Send}
        iconPosition='right'
      >
        Become Instructor
      </Button>

      <Button
        variant='primary'
        icon={Send}
      >
        Send Message
      </Button>

      <Button
        variant='secondary'
        icon={Star}
      >
        Add to Favorites
      </Button>

      <Button
        variant='outline'
        icon={Heart}
      >
        Save Course
      </Button>

      {/* // Ghost */}
      <Button
        variant='ghost'
        icon={User}
      >
        View Profile
      </Button>
    </div>
  );
};

export default ButtonTest;
