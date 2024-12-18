import {Button, Collapse, Combobox, Input, InputBase, Paper, SimpleGrid, useCombobox, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconSearch} from '@tabler/icons-react';
import {useState} from "react";
import {QueryParams} from "../types/queryParams.ts";

// To add: updating combobox with sortby options when user inputs queryparams
const sortBy = ["↑ price", "↓ price", "↑ date", "↓ date"];
type SetParams = (newParams: QueryParams) => void;

export const SearchPanel = ({ setParams } : { setParams: SetParams}) => {
    const [opened, {toggle}] = useDisclosure(false);
    const icon = <IconSearch size={14} />;


    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState<string | null>(null);

    const handleApply = ()=>{
        switch (value){
            case "↑ price":
                setParams({sortBy: 'price', sortOrder: 'asc'});
                break;

            case "↓ price":
                setParams({sortBy: 'price', sortOrder: 'desc'});
                break;

            case "↑ date":
                setParams({sortBy: 'createdAt', sortOrder: 'asc'});
                break;

            case "↓ date":
                setParams({sortBy: 'createdAt', sortOrder: 'desc'});
                break;
            default:
                break;
        }
    }


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
                        <Text></Text>
                        <Button color="teal" radius="lg" onClick={handleApply}>Apply</Button>
                    </SimpleGrid>
                </Collapse>
            </Paper>
        </>
    );
}