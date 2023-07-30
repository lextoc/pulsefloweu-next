"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

import endpoints from "@/api/endpoints";
import update from "@/api/update";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Modal from "@/components/Overlays/Modals/Base";
import AuthenticationContext from "@/lib/Authentication/Context";
import { useSnackbarStore } from "@/stores/snackbar";

export interface OnboardingFormValues {
  firstName: string;
  lastName: string;
  username: string;
}

export interface OnboardingProps {}

export function Onboarding(props: OnboardingProps) {
  const showSnackbar = useSnackbarStore((state) => state.show);
  const queryClient = useQueryClient();

  const user = useContext(AuthenticationContext);
  const [isOpen, setIsOpen] = useState(false);

  if (
    !isOpen &&
    user?.email &&
    (!user?.first_name || !user?.last_name || !user?.username)
  ) {
    setIsOpen(true);
  }

  const form = useForm<OnboardingFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = (values: OnboardingFormValues) => {
    update(endpoints.auth, {
      first_name: values.firstName,
      last_name: values.lastName,
      username: values.username,
    }).then((data) => {
      if (data?.errors) {
        showSnackbar({
          message: data?.errors?.join(" "),
          type: "error",
        });
      } else {
        queryClient.invalidateQueries().then(() => {
          setIsOpen(false);
        });
      }
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} close={() => false}>
        <h1>Onboarding</h1>
        <p>Please fill in your details before continuing.</p>
        <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Input
            label="First name"
            {...form.getInputProps("firstName")}
            placeholder="First name"
          />
          <Input
            label="Last name"
            {...form.getInputProps("lastName")}
            placeholder="Last name"
          />
          <Input
            label="Username"
            {...form.getInputProps("username")}
            placeholder="Username"
          />
          <div className="buttons-right">
            <Button type="submit">Save and continue</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
