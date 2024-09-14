import { Button, ButtonType } from '@frontend/components/common/Button';

export function LogOutButton() {
  return (
    <Button href="/logout" type={ButtonType.Secondary} className="w-fit h-fit">
      Log Out
    </Button>
  );
}
