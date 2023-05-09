import { Fragment, useRef, useState } from "react";
import {
  IconButton,
  Input,
  Checkbox,
  Typography,
  Button,
  Card,
  Select,
  Option,
} from "@material-tailwind/react";
import { Dialog, Transition } from "@headlessui/react";

type ModalAddLayerProps = {
  addLayerFunction: () => void;
};

export function ModalAddLayer(props: ModalAddLayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { addLayerFunction } = props;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function createLayer() {
    addLayerFunction();
    closeModal();
  }

  const cancelButtonRef = useRef(null);

  return (
    <>
      <IconButton onClick={openModal}>
        <i className="fas fa-plus" />
      </IconButton>
      <Transition appear show={isOpen} as={Fragment}>
        <div className="fixed ">
          <Dialog as="div" className="relative z-20" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Typography color="blue-gray">
                      <Dialog.Title
                        as="h4"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Add Layer
                      </Dialog.Title>
                    </Typography>
                    <Card color="transparent" shadow={false}>
                      <Typography color="gray" className="mt-1 font-normal">
                        Enter layer details.
                      </Typography>
                      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <Typography color="blue-gray">
                          <div className="mb-4 flex flex-col gap-6 m-4 p-4">
                            <Input size="lg" label="Name" />
                            <Input size="lg" label="Geo Column" />
                            <Select
                              label="Geo Type"
                              menuProps={{ className: "h-48" }}
                            >
                              {[
                                { name: "polygon" },
                                { name: "point" },
                                { name: "h3" },
                              ].map(({ name }: any) => (
                                <Option key={name} value={name}>
                                  {name}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </Typography>
                        <Button
                          className="mt-6"
                          fullWidth
                          onClick={createLayer}
                        >
                          Create
                        </Button>
                      </form>
                    </Card>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </div>
      </Transition>
    </>
  );
}
