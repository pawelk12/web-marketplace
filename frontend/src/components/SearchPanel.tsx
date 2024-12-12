import {Button, Collapse, Combobox, Input, InputBase, Paper, SimpleGrid, useCombobox, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconSearch} from '@tabler/icons-react';
import {useState} from "react";


const sortBy = ["↑ price", "↓ price", "↑ date", "↓ date"];

export const SearchPanel = () => {
    const [opened, {toggle}] = useDisclosure(false);
    const icon = <IconSearch size={14} />;


    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState<string | null>(null);


    const options = sortBy.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));




    return (
        <>
            <Button onClick={toggle} fullWidth={true} variant="outline" color="teal" size="md" radius="lg"
                    justify="space-between" rightSection={icon} mt="md">Search</Button>
            <Paper radius="lg" p="lg">
                <Collapse in={opened}>
                    <SimpleGrid cols={2}>
                        <Text>Sort by:</Text>
                        <Combobox
                            store={combobox}
                            onOptionSubmit={(val) => {
                                setValue(val);
                                combobox.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    rightSectionPointerEvents="none"
                                    onClick={() => combobox.toggleDropdown()}
                                >
                                    {value || <Input.Placeholder>Pick value</Input.Placeholder>}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                                <Combobox.Options>{options}</Combobox.Options>
                            </Combobox.Dropdown>
                        </Combobox>
                    </SimpleGrid>
                </Collapse>
            </Paper>
        </>
    );
}